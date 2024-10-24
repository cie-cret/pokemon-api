<script setup lang="ts"></script>

<template>
  <div class="loading-spinner-wrapper">
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M4.41598 26.9833C4.74727 27.7205 4.4182 28.5867 3.681 28.918C2.94379 29.2493 2.07761 28.9202 1.74632 28.183C0.600507 25.6332 0 22.857 0 20C0 8.95453 8.95453 0 20 0C31.0455 0 40 8.95453 40 20C40 31.0455 31.0455 40 20 40C15.3068 40 10.8594 38.3761 7.30534 35.4561C6.68085 34.9431 6.59052 34.0209 7.10359 33.3964C7.61665 32.7719 8.53882 32.6816 9.16331 33.1947C12.1987 35.6885 15.991 37.0732 20 37.0732C29.429 37.0732 37.0732 29.429 37.0732 20C37.0732 10.571 29.429 2.92683 20 2.92683C10.571 2.92683 2.92683 10.571 2.92683 20C2.92683 22.4415 3.43894 24.8091 4.41598 26.9833Z"
        fill="#30A7D7"
      />
    </svg>
  </div>
  <div class="loading-text-wrapper">
    <h3>Sending Request</h3>
    <p>
      Please wait<span class="dot1">.</span><span class="dot2">.</span
      ><span class="dot3">.</span>
    </p>
  </div>
</template>

<style scoped lang="scss">
// Root

@import '/src/scss/Colors.scss';
@import '/src/scss/Breakpoints.scss';

// Loading Spinner

.loading-spinner-wrapper {
  margin: 4px;
  margin-bottom: 28px;
  width: 40px;
  height: 40px;
  animation: spin 1s linear infinite;
}

.loading-text-wrapper {
  line-height: 24px;
  h3 {
    font-weight: 600;
    font-size: 18px;
    color: $Black;
    overflow-y: hidden;
  }

  p {
    font-weight: 400;
    font-size: 14px;
    color: $Text;
    margin-top: 4px;
    overflow-y: hidden;

    span {
      animation: appear 2s linear infinite;
      &.dot1 {
        opacity: 0;
        animation-delay: 0s;
      }
      &.dot2 {
        opacity: 0;
        animation-delay: 0.3s;
      }
      &.dot3 {
        opacity: 0;
        animation-delay: 0.6s;
      }
    }
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes appear {
  0% {
    opacity: 0;
  }

  10% {
    opacity: 1;
  }
}
</style>
