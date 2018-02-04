<template>
  <div>
    <img v-lazy="match.team_a.image_url">
    <img v-lazy="match.team_b.image_url">
  </div>
</template>

<script>
export default {
  name: 'match-item',
  props: ['match']
}
</script>
