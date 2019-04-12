<template>
    <div>
      <script id="editor" type="text/plain"></script>
    </div>
</template>

<script>
export default {
  name: 'Ueditor',
  data () {
    return {
      editor: null
    }
  },
  props: {
    defaultMsg: {
      type: String
    },
    config: {
      type: Object
    }
  },
  mounted () {
    const _this = this
    this.editor = Ueditor.getEditor('editor', this.config)
    this.editor.addListener('ready', function () {
      _this.editor.setContent(_this.defaultMsg)
    })
  },
  methods: {
    getUEContent () {
      return this.editor.getContent()
    }
  },
  destroyed () {
    this.editor.destroyed()
  }
}
</script>

<style scoped>

</style>
