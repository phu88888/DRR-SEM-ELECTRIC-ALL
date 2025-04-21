<template>
  <div class="logo-container">
    <svg
      class="responsive-svg"
      viewBox="0 0 115 27"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M115 0H98L84.5 27H102L115 0Z"
        fill="#E8D20A"
      />
      <path
        d="M93.5 0H76.5L63 27H80.5L93.5 0Z"
        fill="#C3E80A"
      />
      <path
        d="M72.5 0H55.5L42 27H59.5L72.5 0Z"
        fill="#A2E80A"
      />
      <path
        d="M51.5 0H34.5L21 27H38.5L51.5 0Z"
        fill="#63E80A"
      />
      <path
        d="M30.5 0H13.5L0 27H17.5L30.5 0Z"
        fill="#0AE867"
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
