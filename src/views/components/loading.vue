 <template>
  <div className="loader-container">
    <div className="loader-block">
      <div className="loader-title">loading</div>
      <div className="loadingspinner">
        <span className="line line-1" />
        <span className="line line-2" />
        <span className="line line-3" />
        <span className="line line-4" />
        <span className="line line-5" />
        <span className="line line-6" />
        <span className="line line-7" />
        <span className="line line-8" />
        <span className="line line-9" />
      </div>
    </div>
  </div>
</template>
<script>  
export default {
  name: "Loading"
}
</script> 
<style lang="less" scoped>
.loader-container {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background: rgb(0 0 0 / 48%);
  z-index: 11;
  display: block;

  &.active {
    display: block;
  }

  .loader-block {
    position: absolute;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);

    display: flex;
    flex-flow: column;
    align-items: center;

    font-size: 1.7em;
    letter-spacing: 0.16em;
  }

  .loader-title {
    color: #fff;
    text-transform: uppercase;
  }
}

.loadingspinner {
  margin-top: 0.5em;
  width: 100%;

  .line {
    width: 2px;
    height: 24px;
    background: #fff;
    margin: 0 6px;
    display: inline-block;
    animation: spinner-line 1000ms infinite ease-in-out;
  }

  .line-1 {
    animation-delay: 800ms;
  }
  .line-2 {
    animation-delay: 600ms;
  }
  .line-3 {
    animation-delay: 400ms;
  }
  .line-4 {
    animation-delay: 200ms;
  }
  .line-6 {
    animation-delay: 200ms;
  }
  .line-7 {
    animation-delay: 400ms;
  }
  .line-8 {
    animation-delay: 600ms;
  }
  .line-9 {
    animation-delay: 800ms;
  }
}

@keyframes spinner-line {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>