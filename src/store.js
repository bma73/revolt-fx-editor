import { createStore } from 'vuex'
import { FX } from 'revolt-fx'
import { Editor } from './editor/editor.js'
import _ from 'lodash'

export const INIT_BUNDLE = 'INIT_BUNDLE';
export const SET_BUNDLE = 'SET_BUNDLE';
export const SET_BUNDLE_NAME = 'SET_BUNDLE_NAME';

export const ADD_EMITTER_PRESET = 'ADD_EMITTER_PRESET';
export const DELETE_EMITTER_PRESET = 'DELETE_EMITTER_PRESET';
export const CLONE_EMITTER_PRESET = 'CLONE_EMITTER_PRESET';
export const RENAME_EMITTER_PRESET = 'RENAME_EMITTER_PRESET';

export const ADD_SEQUENCE_PRESET = 'ADD_SEQUENCE_PRESET';
export const DELETE_SEQUENCE_PRESET = 'DELETE_SEQUENCE_PRESET';
export const CLONE_SEQUENCE_PRESET = 'CLONE_SEQUENCE_PRESET';
export const RENAME_SEQUENCE_PRESET = 'RENAME_SEQUENCE_PRESET';


const getId = () => {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, a => (a ^ Math.random() * 16 >> a / 4).toString(16));
};


//revolt-fx-bundle
const state = {
  bundle: {
    name: '',
    id: '',
    maxParticles: 5000,
    useBlendModes: true,
    emitters: [],
    sequences: [],
    spritesheetFilter: '',
    __eid: 0,
    __sid: 0,
    __h: '80c6df7fb0d3d898f34ce0031c037fef',
    __v: 0
  },
  settings: {
    tt: {
      delay: 1500,
      effect: 'dark',
      placement: 'left'
    }
  },
  spritesheet: {
    imageName: '',
    jsonName: '',
    json: null,
    image: null
  }
};

const mutations = {

  [INIT_BUNDLE](state, p) {
    state.bundle.name = p.name;
    state.bundle.id = '';
    state.bundle.emitters = [];
    state.bundle.sequences = [];
    state.bundle.spritesheetFilter = p.spritesheetFilter;
    state.bundle.__eid = 0;
    state.bundle.__sid = 0;
    state.bundle.__v = FX.settingsVersion;
  },

  [SET_BUNDLE](state, bundle) {
    state.bundle = bundle;
    sort(state.bundle.emitters);
    sort(state.bundle.sequences);
  },

  [SET_BUNDLE_NAME](state, name) {
    state.bundle.name = name;
  },


  //*** Effect Sequence

  [ADD_SEQUENCE_PRESET](state, name) {
    const preset = createSequencePreset(name);
    state.bundle.sequences.push(preset);
    // sort(state.bundle.sequences);
    Editor.fx.addEffectSequence(preset.id, preset);
  },

  [DELETE_SEQUENCE_PRESET](state, preset) {
    const index = state.bundle.sequences.indexOf(preset);
    if (index != -1) {
      state.bundle.sequences.splice(index, 1);
      sort(state.bundle.sequences);
    }

  },

  [CLONE_SEQUENCE_PRESET](state, payload) {
    const clone = JSON.parse(JSON.stringify(payload.preset));
    clone.id = state.bundle.__sid++;
    clone.name = payload.name;
    state.bundle.sequences.push(clone);
    // sort(state.bundle.sequences);

    Editor.fx.addEffectSequence(clone.id, clone);
  },

  [RENAME_SEQUENCE_PRESET](state, payload) {
    payload.preset.name = payload.name;
    // sort(state.bundle.sequences);
  },


  //*** Particle Emitter

  [ADD_EMITTER_PRESET](state, name) {
    const preset = createEmitterPreset(name);
    state.bundle.emitters.push(preset);
    sort(state.bundle.emitters);
    Editor.fx.addParticleEmitter(preset.id, preset);
  },

  [DELETE_EMITTER_PRESET](state, preset) {
    const index = state.bundle.emitters.indexOf(preset);
    if (index != -1) {
      state.bundle.emitters.splice(index, 1);
      // sort(state.bundle.emitters);
    }
  },

  [CLONE_EMITTER_PRESET](state, payload) {
    const clone = JSON.parse(JSON.stringify(payload.preset));
    clone.id = state.bundle.__eid++;
    clone.name = payload.name;
    state.bundle.emitters.push(clone);
    // sort(state.bundle.emitters);
    Editor.fx.addParticleEmitter(clone.id, clone);
  },

  [RENAME_EMITTER_PRESET](state, payload) {
    payload.preset.name = payload.name;
    // sort(state.bundle.emitters);
  }
};

const sort = list => {
  _.sortBy(list, 'name')
};

const store = createStore({ state, mutations })

const createSequencePreset = name => {
  return {
    id: state.bundle.__sid++,
    name: name,
    type: 1,
    delay: 0,
    scaleMin: 1,
    scaleMax: 1,
    effects: [],
    __cid: 0
  }
};


const createEmitterPreset = name => {

  const list = Editor.instance.spritesheetImagesList;
  const spriteId = list[0].name;

  return {
    id: state.bundle.__eid++,
    name: name,
    type: 0,

    core: {
      type: 'circle',
      params: {
        radius: 100,
        radial: true,
        angle: 6.28318530718,
        uniform: false,
        width: 100,
        height: 100
      }
    },
    spawnFrequencyMin: 0.1,
    spawnFrequencyMax: 0.1,
    maxParticles: 1000,
    spawnCountMin: 1,
    spawnCountMax: 1,
    duration: 0,
    infinite: true,
    useGravity: false,
    gravity: 0,
    useFloor: false,
    floorY: 0,
    rotation: 0,
    autoRotation: 0,

    particleSettings: {
      componentType: 0, //sprite, MovieClip, Emitter
      componentId: spriteId,
      componentParams: {
        animationSpeedMin: 0.1,
        animationSpeedMax: 0.5,
        anchorX: 0.5,
        anchorY: 0.5,
        loop: false
      },
      durationMin: 1,
      durationMax: 2,
      distanceMin: 0,
      distanceMax: 0,
      distanceEase: 'linear',

      moveSpeedMin: 0,
      moveSpeedMax: 0,
      bounceFacMin: 0,
      bounceFacMax: 0,
      frictionMin: 0,
      frictionMax: 0,

      useMotion: false,
      useRotation: false,
      useAlpha: false,
      useScale: false,
      useTint: false,
      useChilds: false,
      useSpawns: false,

      stopOnBounce: false,

      align: false,

      blendMode: 1,

      addOnTop: true,

      rotationSpeedMin: 0,
      rotationSpeedMax: 0,
      randomRotationDirection: false,
      randomStartRotation: false,

      fadeIn: true,
      fadeInDurationFac: 0.2,
      fadeInEase: 'linear',

      alphaStartMin: 1,
      alphaStartMax: 1,
      alphaEndMin: 0,
      alphaEndMax: 0,
      alphaEase: 'linear',

      tintStart: 0xffffff,
      tintEnd: 0xffffff,
      tintEase: 'linear',

      scaleIn: false,
      scaleInDurationFac: 0.2,
      scaleInEase: 'linear',

      uniformScale: true,

      scaleXStartMin: 1,
      scaleXStartMax: 1,
      scaleXEndMin: 1,
      scaleXEndMax: 1,
      scaleXEase: 'linear',

      scaleYStartMin: 1,
      scaleYStartMax: 1,
      scaleYEndMin: 1,
      scaleYEndMax: 1,
      scaleYEase: 'linear',

      scaleStartMin: 1,
      scaleStartMax: 1,
      scaleEndMin: 1,
      scaleEndMax: 1,
      scaleEase: 'linear',

      childs: [],
      spawn: {
        onComplete: [],
        onBounce: [],
        onStart: [],
        onHalfway: []
      }
    },
    childs: []

  }
};


export default store;


