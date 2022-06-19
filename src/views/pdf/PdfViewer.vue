<template>
  <iframe
      width="100%"
      height="500"
      scrolling="no"
      :src="`/pdf/web/viewer.html?file=${url}`"
    ></iframe>
</template>

<script>

export default ({
  props: {
    url: {
      type: String,
      required: true
    }
  },
})
</script>
