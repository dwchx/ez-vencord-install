// Import necessary functions and components
import { openModalLazy } from "@utils/modal";
import { MicrophoneSettingsModal } from "../components";
import { PluginInfo } from "../constants";
import Plugin from "../index";
import { microphoneStore } from "../stores";

// Define a callback function to be called when the microphone modal is done
const onMicrophoneModalDone = () => {
    // Destructure microphonePatcher from Plugin
    const { microphonePatcher } = Plugin;

    // If microphonePatcher exists, force update the transportation options
    if (microphonePatcher)
        microphonePatcher.forceUpdateTransportationOptions();
};

// Export a function to open the microphone settings modal
export const openMicrophoneSettingsModal =
    () => openModalLazy(async () => {
        // Return a function that takes props and renders the MicrophoneSettingsModal component
        return props =>
            <MicrophoneSettingsModal
                onDone={onMicrophoneModalDone} // Callback for when the modal is done
                showInfo // Show information flag
                microphoneStore={microphoneStore} // Pass the microphoneStore to the modal
                author={PluginInfo.AUTHOR} // Author information from PluginInfo
                contributors={Object.values(PluginInfo.CONTRIBUTORS)} // List of contributors from PluginInfo
                {...props} // Spread any additional props
            />;
    });
