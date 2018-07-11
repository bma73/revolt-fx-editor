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
      <p>
        Particle Emitter<br>
        <el-select v-model="emitterId">
          <el-option
            v-for="option in emitters" :key="option.id"
            v-if="exclude && option.id != exclude.id"
            :value="option.id"
            :label="getName(option)"
          />
        </el-select>
      </p>
      <help text="Scale modificator">
        <p>
          Scale<br>
          <el-input-number v-model="scale" controls-position="right"/>
        </p>
      </help>

      <help text="Component adopts rotation of parent">
        <value-element>
          <el-checkbox v-model="adoptRotation">Adopt parent rotation</el-checkbox>
        </value-element>
      </help>

      <help text="ID of a registered container to attach the emitter to">
        <p>
          <el-input v-model="containerId" placeholder="Container Id"></el-input>
        </p>
      </help>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modalVisible=false">Cancel</el-button>
        <el-button type="primary" :disabled="isDisabled" @click="ok">OK</el-button>
      </span>
    </el-dialog>

    <el-dialog title="Edit" :visible.sync="editModalVisible" width="400px">

      <help text="Scale modificator">
        <p>
          Scale<br>
          <el-input-number v-model="scale" controls-position="right"/>
        </p>
      </help>
      <help text="Component adopts rotation of parent">
        <value-element>
          <el-checkbox v-model="adoptRotation">Adopt parent rotation</el-checkbox>
        </value-element>
      </help>
      <help text="ID of a registered container to attach the emitter to">
        <p>
          <el-input v-model="containerId" placeholder="Container Id"></el-input>
        </p>
      </help>
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
    name: "ChildList",
    components: {ValueElement, Help, NumberValue, List},
    props: ['elements', 'exclude'],
    data() {
      return {
        modalVisible: false,
        editModalVisible: false,
        scale: 1,
        emitterId: null,
        containerId: '',
        editData: null,
        adoptRotation: true
      }
    },
    computed: {
      emitters() {
        return _.sortBy(this.$store.state.bundle.emitters.slice(), 'name');
      },
      isDisabled() {
        return this.emitterId == null;
      }
    },
    methods: {
      getName(obj) {
        return `[E] ${this.$editor.getEmitterById(obj.id).name}`;
      },

      onAdd() {
        this.modalVisible = true;
        this.containerId = '';
        this.scale = 1;
        this.adoptRotation = true;
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

        const e = this.$editor.getEmitterById(this.emitterId);
        const data = {
          type: 0,
          id: e.id,
          scale: this.scale,
          containerId: this.containerId,
          adoptRotation: this.adoptRotation
        };
        this.$emit('add', data);
      }
    }
  }
</script>

<style scoped>

</style>
