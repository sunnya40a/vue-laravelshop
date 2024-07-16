<template>
  <div class="not-found-container">
    <img src="@/assets/notfound.jpg" alt="404 Not Found Image" class="not-found-image" />
    <h1 class="not-found-title">Oops! Page Not Found</h1>
    <p class="not-found-description">
      The page you are looking for might be in another universe. Let's navigate back to home.
    </p>
    <router-link to="/" class="back-to-home-button">Back to Home</router-link>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.not-found-container {
  text-align: center;
  margin-top: 5rem;

  .not-found-image {
    width: 30rem;
    height: 30rem;
    margin-bottom: 2rem;
  }

  .not-found-title {
    font-size: 3.6rem;
    color: #333;
  }

  .not-found-description {
    font-size: 1.8rem;
    color: #666;
    margin-bottom: 3rem;
  }

  .back-to-home-button {
    display: inline-block;
    padding: 1rem 2rem;
    font-size: 1.6rem;
    background-color: #3498db;
    color: #fff;
    text-decoration: none;
    border-radius: 0.5rem;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #2980b9;
    }
  }
}
</style>
