<template>
  <div>
    <el-dialog v-model="visible" title="New Bundle" width="400px">
      <el-input v-model="name" placeholder="Name"></el-input>

      <help text="Add a spritesheet PNG and JSON file">
        <div class="choose-file">
          <span>{{infoText}}</span>
          <input type="file" multiple @change="handleFiles"/>
        </div>
      </help>

      <template #footer>
        <el-button @click="visible = false">Cancel</el-button>
        <el-button :disabled="!createOk" type="primary" @click="create">Create</el-button>
      </template>
      <img src="/foo.png" ref="preview" class="spritesheet-preview"/>
      <help text="Add only textures containing this string in their names as FX assets">
        <el-input v-model="spritesheetFilter" placeholder="Texture Filter" style="width:50%;" @change="checkFilter"></el-input>
      </help>
      <div v-if="filterError" class="filter-error">Invalid Filter</div>
    </el-dialog>
  </div>
</template>

<script>

  import {INIT_BUNDLE} from "../store";
  import {EVENT_EMITTER_PRESET_SELECTED, EVENT_RESET} from "../events";
  import Help from "./Help.vue";


  let jsonFile;
  let imageFile;

  const infoText = 'Click to add spritesheet assets...';

  export default {
    name: "NewBundle",
    components: {Help},
    props: [],
    computed: {
      createOk() {
        return !this.filterError && this.tempJson && this.tempImage;
      }
    },
    methods: {

      show() {
        this.visible = true;
        this.name = this.spritesheetFilter = this.mcFilter = '';
        this.infoText = infoText;

        this.filterError = false;

        this.tempImage = null;
        this.tempJson = null;
        jsonFile = null;
        imageFile = null;
        if (this.$refs.preview) this.$refs.preview.src = '/static/foo.png';
      },

      async handleFiles(e) {
        try {
          const files = e.target.files;
          let err = 'Please provide a spritesheet PNG image and a JSON file.';

          if (files.length != 2) {
            this.showAlert(err);
            return;
          }
          imageFile = this.findType(files, 'image/png');
          jsonFile = this.findType(files, 'application/json');

          if (jsonFile == null || imageFile == null) {
            this.showAlert(err);
            return;
          }

          this.$eventBus.$emit(EVENT_RESET);

          const data = await this.$editor.loadSpritesheetLocal(jsonFile, imageFile);

          if (!data.json.frames) {
            this.showAlert('Please provide a valid spritesheet JSON file.');
            return;
          }

          this.tempJson = data.json;
          this.tempImage = data.image;
          this.$refs.preview.src = data.image;

          this.checkFilter();

          this.infoText = `${imageFile.name}, ${jsonFile.name}`;

          e.target.value = '';


        } catch (e) {
          this.showAlert('Something went wrong!');
          console.log(e);
        }
      },

      async create() {

        this.checkFilter();

        if (this.filterError) {
          return;
        }

        const loader = this.$loading({fullscreen: true, background: 'white', text: 'RevoltFX'});
        this.$store.commit(INIT_BUNDLE,
          {
            name: this.name || 'New Bundle',
            spritesheetFilter: this.spritesheetFilter
          });

        this.$eventBus.$emit(EVENT_RESET);

        await this.$editor.createSpritesheet(this.tempImage, this.tempJson, this.spritesheetFilter);

        this.$store.state.spritesheet.imageName = imageFile.name;
        this.$store.state.spritesheet.jsonName = jsonFile.name;
        this.visible = false;
        this.$eventBus.$emit(EVENT_EMITTER_PRESET_SELECTED, null);
        loader.close();
      },
      findType(files, type) {
        for (let i = 0; i < files.length; i++) {
          if (files[i].type == type) {
            return files[i];
          }
        }
        return null;
      },

      showAlert(message) {
        this.$notify.error({
          title: 'Oops',
          message: message
        });
      },
      checkFilter() {
        if (this.tempJson != null && this.spritesheetFilter != '') {
          const filter = this.spritesheetFilter;
          let ok = false;
          for (let i in this.tempJson.frames) {
            if (i.indexOf(filter) != -1) {
              ok = true;
              break;
            }
          }
          this.filterError = !ok;
        } else {
          this.filterError = false;
        }
      }
    },

    data() {
      return {
        visible: false,
        name: '',
        infoText: null,
        spritesheetFilter: null,
        mcFilter: null,
        filterError: false,
        tempImage: null,
        tempJson: null
      }
    }
  }


</script>

<style lang="scss" scoped>
  $height: 60px;
  .choose-file {
    position: relative;
    display: inline-block;
    border-radius: 5px;
    border: #dddddd dashed 2px;
    width: 100%;
    height: $height;
    color: #7f7f7f;
    margin-top: 10px;
    line-height: $height;
    text-align: center;
    font-size: 1.2rem;
  }

  .filter-error {
    color: red;
    font-weight: 500;
  }

  .choose-file input[type="file"] {
    position: absolute;
    background-color: brown;
    width: 100%;
    height: $height;
    top: 0;
    left: 0;
    opacity: 0;
  }

  .spritesheet-preview {
    $size: 360px;
    width: $size;
    height: $size;
    background-color: #dddddd;
    margin-top: 10px;
  }

</style>
