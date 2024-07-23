import { PluginAuthor, PluginDef } from "@utils/types";
import { addSettingsPanelButton, Emitter, MicrophoneSettingsIcon, removeSettingsPanelButton } from "../philsPluginLibrary";
import { PluginInfo } from "./constants";
import { openMicrophoneSettingsModal } from "./modals";
import { MicrophonePatcher } from "./patchers";
import { initMicrophoneStore } from "./stores";

// Main Plugin Class Implementation
export default new class Plugin implements PluginDef {
    readonly name: string;
    readonly description: string;
    readonly authors: PluginAuthor[];
    readonly dependencies: string[];

    // Optional property to store the microphone patcher instance
    public microphonePatcher?: MicrophonePatcher;

    // Constructor initializes plugin information from PluginInfo constants
    constructor() {
        this.name = PluginInfo.PLUGIN_NAME;
        this.description = PluginInfo.DESCRIPTION;
        this.authors = [PluginInfo.AUTHOR, ...Object.values(PluginInfo.CONTRIBUTORS)] as PluginAuthor[];
        this.dependencies = ["PhilsPluginLibrary"];
    }

    // Method to start the plugin
    start(): void {
        // Initialize the microphone store
        initMicrophoneStore();

        // Apply microphone patching
        this.microphonePatcher = new MicrophonePatcher().patch();

        // Add settings panel button for microphone settings
        addSettingsPanelButton({
            name: PluginInfo.PLUGIN_NAME,
            icon: MicrophoneSettingsIcon,
            tooltipText: "Microphone Settings",
            onClick: openMicrophoneSettingsModal
        });
    }

    // Method to stop the plugin
    stop(): void {
        // Unpatch the microphone patcher if it exists
        this.microphonePatcher?.unpatch();

        // Remove all event listeners associated with this plugin
        Emitter.removeAllListeners(PluginInfo.PLUGIN_NAME);

        // Remove the settings panel button
        removeSettingsPanelButton(PluginInfo.PLUGIN_NAME);
    }
};
