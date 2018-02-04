<template>
  <div>
    <img v-lazy="match.team_a.image_url" :alt="match.team_a.name">
    <img v-lazy="match.team_b.image_url" :alt="match.team_a.name">
  </div>
</template>

<script>
export default {
  name: 'match-item',
  props: ['match']
}
</script>
