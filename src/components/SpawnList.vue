<template>
  <div>
    <list
      :cloneButton="false"
      :renameButton="false"
      :elements="elements"
      :useDefaultNamePrompt="false"
      :nameCallback="getName"
      :alwaysSelect="true"
      @select="onSelect"
      @add="onAdd"
      @remove="onRemove"
    />

    <el-dialog title="Select Component" :visible.sync="modalVisible" width="400px">
      <el-radio-group v-model="type">
        <el-radio-button :label="0">Particle Emitter</el-radio-button>
        <el-radio-button :label="1">Sequence</el-radio-button>
      </el-radio-group>

      <p>
        <el-select v-if="type==0" v-model="emitterId">
          <el-option
            v-for="option in emitters" :key="option.id"
            v-if="option.type == 0 && (exclude && option.id != exclude.id)"
            :value="option.id"
            :label="getEmitterName(option)"
          />
        </el-select>

        <el-select v-if="type==1" v-model="sequenceId">
          <el-option
            v-for="option in sequences" :key="option.id"
            v-if="option.type == 1 && (exclude && option.id != exclude.id)"
            :value="option.id"
            :label="getSequenceName(option)"
          />
        </el-select>
      </p>

      <help text="Scale modificator">
        <p>
          Scale<br>
          <el-input-number v-model="scale" controls-position="right"/>
        </p>
      </help>
      <value-element>
        <el-checkbox v-model="adoptRotation">Adopt parent rotation</el-checkbox>
      </value-element>
      <p v-if="type==0">

        <help text="ID of a registered container to attach the component to">
          <el-input v-model="containerId" placeholder="Container Id"></el-input>
        </help>
      </p>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modalVisible=false">Cancel</el-button>
        <el-button type="primary" :disabled="isDisabled" @click="ok">OK</el-button>
      </span>
    </el-dialog>


    <el-dialog title="Edit" :visible.sync="editModalVisible" width="400px">
      <b>{{getName(editData)}}</b>
      <p>
        Scale<br>
        <el-input-number v-model="scale" controls-position="right"/>
      </p>
      <value-element>
        <el-checkbox v-model="adoptRotation">Adopt parent rotation </el-checkbox>
      </value-element>
      <p v-if="type==0">
        <el-input v-model="containerId" placeholder="Container Id"></el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="editModalVisible=false">Cancel</el-button>
        <el-button type="primary" @click="applyChanges">OK</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import List from "./list/List";
  import NumberValue from "./values/NumberValue";
  import Help from "./Help";
  import ValueElement from "./values/ValueElement";
  import * as _ from 'lodash';

  export default {
    name: "SpawnList",
    components: {ValueElement, Help, NumberValue, List},
    props: ['elements', 'exclude'],
    data() {
      return {
        modalVisible: false,
        editModalVisible: false,
        type: 0,
        scale: 1,
        adoptRotation: true,
        emitterId: null,
        sequenceId: null,
        containerId: '',
        editData: null
      }
    },
    computed: {
      emitters() {
        return _.sortBy(this.$store.state.bundle.emitters.slice(), 'name');
      },
      sequences() {
        return _.sortBy(this.$store.state.bundle.sequences.slice(), 'name');
      },
      isDisabled() {
        return (this.type == 0 && this.emitterId == null) || (this.type == 1 && this.sequenceId == null);
      }

    },
    methods: {

      getName(data) {
        if (data == null) return '';
        if (data.type == 0) {
          return this.getEmitterName(data);
        }
        return this.getSequenceName(data);
      },

      getEmitterName(obj) {
        const d = this.$editor.getEmitterById(obj.id);
        if (!d) return;
        return `[E] ${d.name}`;
      },
      getSequenceName(obj) {
        const d = this.$editor.getSequenceById(obj.id);
        if (!d) return;
        return `[S] ${d.name}`;
      },
      onAdd() {
        this.modalVisible = true;
      },

      onRemove(data) {
        this.$emit('remove', data.data);
      },

      onSelect(entry) {
        this.scale = entry.data.scale;
        this.containerId = entry.data.containerId;
        this.editData = entry.data;
        this.editModalVisible = true;
        this.adoptRotation = entry.data.adoptRotation;
      },

      applyChanges() {
        this.editData.scale = this.scale;
        this.editData.containerId = this.containerId;
        this.editModalVisible = false;
        this.editData.adoptRotation = this.adoptRotation;
      },

      ok() {
        this.modalVisible = false;

        let data;
        switch (this.type) {
          case 0:
            const e = this.$editor.getEmitterById(this.emitterId);
            data = {
              type: 0,
              id: e.id,
              scale: this.scale,
              adoptRotation: this.adoptRotation,
              containerId: this.containerId
            };
            break;

          case 1:
            const s = this.$editor.getSequenceById(this.sequenceId);
            data = {
              type: 1,
              id: s.id,
              adoptRotation: this.adoptRotation,
              scale: this.scale
            };
            break;

        }

        this.$emit('add', data);
      }

    }


  }
</script>

<style scoped>
  b {
    font-size: 1.2rem;
  }

</style>
