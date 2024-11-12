<script>
export default {}
</script>

<template>
  <form class="registration-form">
    <label class="registration-login-label" for="user-name-input">Username</label>
    <input class="registration-input" type="text" name="user-name-input" />
    <label class="registration-login-label" for="password-input">Password</label>
    <input class="registration-input" type="password" name="password-input" />
    <label class="registration-login-label" for="password-input-repeat">Repeat password</label>
    <input class="registration-input" type="password" name="password-input-repeat" />
    <input type="submit" class="big-flat-button accept-button" value="Submit" />
  </form>
</template>

<style>
.registration-form {
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  align-items: center;
  gap: 30px;
}
.registration-input {
  width: 500px;
}
</style>
