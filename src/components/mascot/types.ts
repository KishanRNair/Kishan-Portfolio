export interface MascotOptions {
  /** Pause rendering when the mascot is off-screen or the tab is hidden. Default: true */
  pauseWhenHidden?: boolean;
  /** Cap for devicePixelRatio. Default: 2 */
  maxPixelRatio?: number;
  /** Scale multiplier for the mascot rig. Default: 1 */
  scale?: number;
}

export interface MascotHandle {
  /** Make the mascot jump, flip and throw sparkles (same as clicking it). */
  poke: () => void;
  /** Stop the loop and free every GPU resource. Safe to call twice. */
  dispose: () => void;
}

export type Mood = 'normal' | 'happy' | 'wow' | 'sleep';

