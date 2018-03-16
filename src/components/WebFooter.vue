<template>
  <div>

    <a class="link-feedback" href="https://www.behance.net/alvaroherrerogarcia">
      <img class="feedback-contact-icon" src="https://twitter.com/intent/tweet?text=%C2%A1Aqu%C3%AD%20ten%C3%A9is%20mi%20feedback%20@E_SportsApp!&related=E_SportsApp" alt="feedback contact">
      deposite aquí su feedback, gracias
    </a>
  </div>
</template>

<script>
export default {
  name: 'web-footer'
}
</script>

<style lang="scss" scoped>
div {
  color: white;
  text-align: center;
  & a {
    text-decoration: none;
    color: white
  }
}
.link-feedback {
  display: flex;
  align-items: center;
  justify-content: center;
}
.feedback-contact-icon {
  width: 20px;
  height:20px;
  padding-left: 5px;
}
</style>

