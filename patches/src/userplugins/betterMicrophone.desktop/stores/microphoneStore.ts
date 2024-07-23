import { createPluginStore, ProfilableInitializer, ProfilableStore, profileable, ProfileableProfile } from "../../philsPluginLibrary";
import { PluginInfo } from "../constants";

// Define the MicrophoneProfile interface for configuring microphone settings
export interface MicrophoneProfile {
    freq?: number;
    pacsize?: number;
    channels?: number;
    rate?: number;
    voiceBitrate?: number;
    freqEnabled?: boolean;
    pacsizeEnabled?: boolean;
    channelsEnabled?: boolean;
    rateEnabled?: boolean;
    voiceBitrateEnabled?: boolean;
}

// Define the MicrophoneStore interface for managing microphone settings
export interface MicrophoneStore {
    simpleMode?: boolean;
    setSimpleMode: (enabled?: boolean) => void;
    setFreq: (freq?: number) => void;
    setPacsize: (pacsize?: number) => void;
    setChannels: (channels?: number) => void;
    setRate: (rate?: number) => void;
    setVoiceBitrate: (voiceBitrate?: number) => void;
    setFreqEnabled: (enabled?: boolean) => void;
    setPacsizeEnabled: (enabled?: boolean) => void;
    setChannelsEnabled: (enabled?: boolean) => void;
    setRateEnabled: (enabled?: boolean) => void;
    setVoiceBitrateEnabled: (enabled?: boolean) => void;
}

// Default microphone profiles with predefined settings
export const defaultMicrophoneProfiles = {
    normal: {
        name: "Normal",
        channels: 2,
        channelsEnabled: true,
        voiceBitrate: 96,
        voiceBitrateEnabled: true
    },
    high: {
        name: "High",
        channels: 2,
        channelsEnabled: true,
        voiceBitrate: 320,
        voiceBitrateEnabled: true
    },
} as const satisfies Record<string, MicrophoneProfile & ProfileableProfile>;

// Default initializer for the microphone store
export const microphoneStoreDefault: ProfilableInitializer<MicrophoneStore, MicrophoneProfile> = (set, get) => ({
    simpleMode: true,
    setSimpleMode: enabled => set(state => ({ ...state, simpleMode: enabled })),
    setFreq: freq => set(state => ({ ...state, currentProfile: { ...state.currentProfile, freq } })),
    setPacsize: pacsize => set(state => ({ ...state, currentProfile: { ...state.currentProfile, pacsize } })),
    setChannels: channels => set(state => ({ ...state, currentProfile: { ...state.currentProfile, channels } })),
    setRate: rate => set(state => ({ ...state, currentProfile: { ...state.currentProfile, rate } })),
    setVoiceBitrate: voiceBitrate => set(state => ({ ...state, currentProfile: { ...state.currentProfile, voiceBitrate } })),
    setFreqEnabled: enabled => set(state => ({ ...state, currentProfile: { ...state.currentProfile, freqEnabled: enabled } })),
    setPacsizeEnabled: enabled => set(state => ({ ...state, currentProfile: { ...state.currentProfile, pacsizeEnabled: enabled } })),
    setChannelsEnabled: enabled => set(state => ({ ...state, currentProfile: { ...state.currentProfile, channelsEnabled: enabled } })),
    setRateEnabled: enabled => set(state => ({ ...state, currentProfile: { ...state.currentProfile, rateEnabled: enabled } })),
    setVoiceBitrateEnabled: enabled => set(state => ({ ...state, currentProfile: { ...state.currentProfile, voiceBitrateEnabled: enabled } })),
});

// Initialize the microphone store as a global variable
export let microphoneStore: ProfilableStore<MicrophoneStore, MicrophoneProfile>;

// Function to initialize the microphone store with default profiles
export const initMicrophoneStore = () => 
    microphoneStore = createPluginStore(
        PluginInfo.PLUGIN_NAME,
        "MicrophoneStore",
        profileable(
            microphoneStoreDefault,
            { name: "" },
            Object.values(defaultMicrophoneProfiles)
        )
    );
