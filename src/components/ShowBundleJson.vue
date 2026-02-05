<template>
  <div>
    <el-dialog v-model="visible" title="Show Bundle JSON" width="500px">
      <el-input class="code" type="textarea" :rows="10" readonly v-model="bundle" placeholder="Name"></el-input>
      <el-button-group style="margin-top: 5px">
        <el-button type="primary" size="small" @click="copy">Copy</el-button>
        <el-button type="primary" size="small" @click="save">Save</el-button>
      </el-button-group>
      <template #footer>
        <el-button type="primary" @click="visible = false">OK</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'

export default {
  name: 'ShowBundleJson',
  props: [],
  data() {
    return { visible: false, bundle: '' }
  },
  methods: {
    show() {
      this.visible = true
      this.bundle = JSON.stringify(this.$store.state.bundle)
    },
    async copy() {
      try {
        await navigator.clipboard.writeText(this.bundle)
        ElMessage.success('Copied')
      } catch {
        ElMessage.error('Error')
      }
    },
    save() {
      const b = this.$store.state.bundle
      this.$editor.saveJsonLocal(b.name || 'bundle', b)
    },
  },
}
</script>

<style lang="scss" scoped>
.code {
  font-family: monospace;
}
</style>
