<template>
  <div>
    <a class="link-feedback" href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fesportscalendar.app&related=E_SportsApp&text=Gracias%20a%20@E_SportsApp%20no%20me%20pierdo%20ning%C3%BAn%20partido">
      <img class="feedback-contact-icon" src="@/assets/img/chat.svg" alt="feedback contact">
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
  padding-right: 5px;
}
</style>

