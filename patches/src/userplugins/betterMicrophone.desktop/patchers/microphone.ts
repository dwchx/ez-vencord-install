import { Emitter, MediaEngineStore, Patcher, types } from "../../philsPluginLibrary";
import { patchConnectionAudioTransportOptions } from "../../philsPluginLibrary/patches/audio";
import { PluginInfo } from "../constants";
import { logger } from "../logger";
import { microphoneStore } from "../stores";

// Class to manage and patch microphone settings
export class MicrophonePatcher extends Patcher {
    // Private properties to hold media engine store and instance, connection, and transport options
    private mediaEngineStore: types.MediaEngineStore;
    private mediaEngine: types.MediaEngine;
    public connection?: types.Connection;
    public oldSetTransportOptions: (...args: any[]) => void;
    public forceUpdateTransportationOptions: () => void;

    // Constructor initializes the media engine and placeholders for transport options
    constructor() {
        super();
        this.mediaEngineStore = MediaEngineStore;
        this.mediaEngine = this.mediaEngineStore.getMediaEngine();
        this.oldSetTransportOptions = () => void 0;
        this.forceUpdateTransportationOptions = () => void 0;
    }

    // Method to apply patches
    public patch(): this {
        // Unpatch any previous patches to prevent duplication
        this.unpatch();

        const { get } = microphoneStore;

        // Function to handle connection events
        const connectionEventFunction = (connection: types.Connection) => {
            // Only proceed if the connection context is "default"
            if (connection.context !== "default") return;

            this.connection = connection;

            // Patch the connection's audio transport options
            const { oldSetTransportOptions, forceUpdateTransportationOptions } = patchConnectionAudioTransportOptions(connection, get, logger);

            // Store the original and updated transport options functions
            this.oldSetTransportOptions = oldSetTransportOptions;
            this.forceUpdateTransportationOptions = forceUpdateTransportationOptions;
        };

        // Add a listener for the connection event to the media engine's emitter
        Emitter.addListener(
            this.mediaEngine.emitter,
            "on",
            "connection",
            connectionEventFunction,
            PluginInfo.PLUGIN_NAME
        );

        return this;
    }

    // Method to remove patches
    public unpatch(): this {
        return this._unpatch();
    }
}
