<template>
  <div>
    <el-dialog title="Save Bundle" :visible.sync="visible" width="400px">
      <el-input v-model="name" placeholder="Name"></el-input>
      <!--<p>-->
        <!--<el-checkbox v-model="includeSpritesheet">Include Spritesheet</el-checkbox>-->
      <!--</p>-->

      <span slot="footer" class="dialog-footer">
        <el-button @click="visible = false">Cancel</el-button>
        <el-button :disabled="name == ''" type="primary" @click="save">Save</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>



  let tempImage;
  let tempDef;
  export default {
    name: "SaveBundle",
    props: [],
    methods: {

      show() {
        this.visible = true;
        this.name = this.$store.state.bundle.name;
        tempImage = null;
        tempDef = null;
        if (this.$refs.preview) this.$refs.preview.src = '/static/foo.png';
      },

      save() {
        this.$editor.saveBundleLocal(this.name, this.includeSpritesheet);
        this.visible = false;
      },

      showAlert(message) {
        this.$notify.error({
          title: 'Error',
          message: message
        });
      }
    },

    data() {
      return {
        visible: false,
        includeSpritesheet: true,
        name: ''
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
