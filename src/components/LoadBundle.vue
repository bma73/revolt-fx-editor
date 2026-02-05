<template>
  <div>
    <el-dialog v-model="visible" title="Load Bundle" width="400px">

      <help text="Add a bundle preset JSON and spritesheet PNG and JSON file">
        <div v-if="!mode || mode=='files'" class="choose-file">
          <span>{{infoFiles}}</span>
          <input multiple type="file" @change="handleFiles"/>
        </div>
      </help>

      <help text="Add a bundle zip file">
        <div v-if="!mode || mode=='zip'" class="choose-file">
          <span>{{infoZip}}</span>
          <input type="file" @change="handleZip"/>
        </div>
      </help>

      <div v-if="mode == 'files'" class="spritesheet-preview">
        <img src="/foo.png" ref="preview"/>
      </div>

      <template #footer>
        <el-button @click="visible = false">Cancel</el-button>
        <el-button :disabled="!loadOk" type="primary" @click="load">Load</el-button>
      </template>

    </el-dialog>

  </div>
</template>

<script>

  import {readAsText, readAsDataURL} from 'promise-file-reader';
  import Help from "./Help.vue";


  let tempImage;
  let tempJson;
  let tempPreset;

  let jsonFiles;
  let imageFiles;

  let imageFile;
  let jsonFile;
  let presetFile;

  const infoFiles = 'Click to add bundle files...';
  const infoZip = 'Click to add bundle ZIP...';

  export default {
    name: "LoadBundle",
    components: {Help},
    props: [],
    methods: {

      show() {
        this.visible = true;
        this.infoFiles = infoFiles;
        this.infoZip = infoZip;
        this.zipFile = null;
        this.mode = null;
        this.loadOk = false;
        tempImage = null;
        tempJson = null;
        tempPreset = null;

        jsonFiles = null;
        imageFiles = null;

        imageFile = null;
        jsonFile = null;
        presetFile = null;

      },


      async handleFiles(e) {
        try {
          const files = e.target.files;
          let err = 'Please provide a bundle preset JSON and the according spritesheet PNG and JSON.';

          if (files.length != 3) {
            this.showAlert(err);
            return;
          }
          imageFiles = this.findType(files, 'image/png');
          jsonFiles = this.findType(files, 'application/json');

          if (jsonFiles.length !== 2 || imageFiles.length !== 1) {
            this.showAlert(err);
            return;
          }

          imageFile = imageFiles[0];

          const json0 = JSON.parse(await readAsText(jsonFiles[0]));
          const json1 = JSON.parse(await readAsText(jsonFiles[1]));


          if (json0.__h && json0.__h == this.$editor.bundleHash) {
            tempPreset = json0;
            tempJson = json1;
            presetFile = jsonFiles[0];
            jsonFile = jsonFiles[1];
          } else if (json1.__h && json1.__h == this.$editor.bundleHash) {
            tempPreset = json1;
            tempJson = json0;
            presetFile = jsonFiles[1];
            jsonFile = jsonFiles[0];
          } else {
            this.showAlert(err);
            return;
          }

          this.mode = 'files';

          this.infoFiles = `${imageFile.name}, ${jsonFile.name}, ${presetFile.name}`;

          this.$refs.preview.src = tempImage = await readAsDataURL(imageFile);

          this.loadOk = true;

          e.target.value = '';

        } catch (e) {
          this.showAlert('Something went wrong!');
          console.log(e);
        }
      },

      handleZip(e) {
        try {
          const files = e.target.files;
          let err = 'Please provide a ZIP file.';

          if (files.length != 1) {
            this.showAlert(err);
            return;
          }

          this.zipFile = files[0];
          const type = this.zipFile.type;

          if (type != 'application/zip') {
            this.showAlert(err);
            return;
          }

          this.infoZip = this.zipFile.name;
          this.mode = 'zip';

          e.target.value = '';

          this.loadOk = true;

        } catch (e) {
          this.showAlert('Something went wrong!');
        }
      },

      load() {
        switch (this.mode) {
          case 'zip':
            this.$editor.loadLocalZipBundle(this.zipFile);
            break;
          case 'files':
            this.$editor.initBundle(tempPreset, tempImage, tempJson);
            break;
        }

        this.visible = false;
      },

      showAlert(message) {
        this.$notify.error({
          title: 'Error',
          message: message
        });
      },

      findType(files, type) {
        const ret = [];
        for (let i = 0; i < files.length; i++) {
          if (files[i].type == type) {
            ret.push(files[i]);
          }
        }
        return ret;
      }
    },

    data() {
      return {
        visible: false,
        zipFile: null,
        infoZip: null,
        infoFiles: null,
        loadOk: false,
        mode: null
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

    color: #7f7f7f;
    margin-top: 10px;
    line-height: $height;
    text-align: center;
    font-size: 1.2rem;
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

  .spritesheet-preview img {
    width: 100%;

  }
</style>
