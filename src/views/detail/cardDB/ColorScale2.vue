<template>
  <div class="logo-container">
    <svg
      width="115"
      height="27"
      viewBox="0 0 115 27"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0 0H17L30.5 27H13L0 0Z"
        fill="#E8D20A"
      />
      <path
        d="M21.5 0H38.5L52 27H34.5L21.5 0Z"
        fill="#E8AD0A"
      />
      <path
        d="M42.5 0H59.5L73 27H55.5L42.5 0Z"
        fill="#E88C0A"
      />
      <path
        d="M63.5 0H80.5L94 27H76.5L63.5 0Z"
        fill="#E86A0A"
      />
      <path
        d="M84.5 0H101.5L115 27H97.5L84.5 0Z"
        fill="#E8280A"
      />
    </svg>

  </div>
</template>

<script>
export default {
  name: 'SpeedyDiagramsLogo',
}
</script>

<style scoped>
.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 10%;
}

.responsive-svg {
  width: 100%;
  height: auto;
  max-width: 100%;
}

@media (max-width: 768px) {
  .logo-container {
    max-width: 90%;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .logo-container {
    max-width: 95%;
    margin: 0 auto;
  }
}
</style>
