<template>
  <div>
    <el-dialog title="Show Bundle JSON" :visible.sync="visible" width="500px">
      <el-input class="code" type="textarea" :rows="10" readonly v-model="bundle" placeholder="Name"></el-input>
      <el-button-group style="margin-top: 5px">
        <el-button type="primary" size="mini" @click="copy">Copy</el-button>
        <el-button type="primary" size="mini" @click="save">Save</el-button>
      </el-button-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="visible=false">OK</el-button>
      </span>

    </el-dialog>

  </div>
</template>

<script>


  let tempImage;
  let tempDef;
  export default {
    name: "ShowBundleJson",
    props: [],
    methods: {

      show() {
        this.visible = true;
        this.bundle = JSON.stringify(this.$store.state.bundle);
      },

      copy() {
        this.$copyText(this.bundle).then((e) => {
          this.$notify({title:'Copied'});
        }, (err) => {
          this.$notify.error({title:'Error'});
        });
      },

      save() {
        const b = this.$store.state.bundle;
        this.$editor.saveJsonLocal(b.name || 'bundle', b);
      },

    },

    data() {
      return {
        visible: false,
        bundle: ''
      }
    }
  }


</script>

<style lang="scss" scoped>
  .code {
    font-family: monospace;
  }
</style>
