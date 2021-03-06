<template>
  <div class="layout-row align-items-center justify-content-center navigation-screen">
    <div class="card layout-row flat map-card">
      <section class="card pb-16 pr-16 flex-auto layout-column justify-content-center">
        <ul class="pl-0" data-testid="location-list">
          <li
            v-for="(location, index) in locations"
            :key="'row' + index" 
            :data-testid="'location-' + index"
            class="layout-row justify-content-between align-items-center mr-8 pl-40 relative"
          >
            <div class="layout-column justify-content-start align-items-center handle">
              <i :class="this.getClasses('marker', index)">
                {{ this.isLast(index) ? 'room' : 'radio_button_checked' }}</i>
              <i :class="this.getClasses('dots', index)">more_vert</i>
            </div>
            <div class="location-name">
              <p class="caption text-start mb-4" data-testid="location">{{ location }}</p>
            </div>
            <div>
              <button
                @click="this.prevLocation"
                v-if="index === 0"
                class="icon-only small mx-0" 
                data-testid="up-button"
              >
                <i class="material-icons">arrow_upward</i>
              </button>
              <button
                @click="this.nextLocation"
                v-if="this.isLast(index)"
                class="icon-only small mx-0"
                data-testid="down-button"
              >
                <i class="material-icons">arrow_downward</i>
              </button>
            </div>
          </li>
        </ul>
      </section>
      <section class="flex-auto">
        <img src="images/map.svg" class="fill" alt="map"/>
      </section>
    </div>

  </div>
</template>

<script>
export default {
  name: "Navigation",
  props: {
    locations: Array
  },

  data: () => ({
    myLocations: this.locations
  }),

  methods: {
    // Used for rendering
    getClasses(ctx, index) {
      let classes = `material-icons ${ctx}`;
      if (ctx === 'dots') {
        if (this.isLast(index)) {
          classes += ' hidden';
        }
      } else {
        classes += this.isLast(index) ? ' small' : ' x-small';
        if (index === 0) {
          classes += ' first';
        }
      }
      return classes;
    },

    // Used for rendering
    isLast(index) {
      return index === this.locations.length - 1;
    },

    isFirst(index) {
      return index === 0;
    },

    nextLocation(index) {
      let locationList = this.myLocations;
      let orgData = locationList[index];
      let tempData = locationList[index + 1];

      locationList[index] = tempData;
      locationList[index + 1] = orgData;

      this.myLocations = locationList;
    },

    prevLocation(index) {
      let locationList = this.myLocations;
      let orgData = locationList[index];
      let tempData = locationList[index - 1];

      locationList[index] = tempData;
      locationList[index - 1 ] = orgData;

      this.myLocations = locationList;
    }
  }
}
</script>

<style scoped>
.navigation-screen {
  height: calc(100vh - 60px);
}

.map-card {
  min-width: 60%;
  flex-direction: row;
}

.flex-auto {
  flex: 1;
}

img.fill {
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.location-name {
  width: 260px;
  white-space: pre;
  overflow: hidden;
  margin-right: 20px;
  position: relative;
  border-bottom: 1px solid #eeeeee;
}

.location-name:after {
  content: '';
  height: 60px;
  position: absolute;
  bottom: 0;
  right: 0;
  width: 40px;
  /* Permalink - use to edit and share this gradient: https://colorzilla.com/gradient-editor/#ffffff+0,ffffff+100&0+0,1+100 */
  background: -moz-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%); /* FF3.6-15 */
  background: -webkit-linear-gradient(left, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%); /* Chrome10-25,Safari5.1-6 */
  background: linear-gradient(to right, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 100%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr='#00ffffff', endColorstr='#ffffff', GradientType=1); /* IE6-9 */
}

i.dots {
  margin-top: 4px;
  transform: scale3d(1.35, 1.5, 1.5);
  color: var(--primary-box-shadow);
}

i.marker {
  color: var(--primary-color);
}

.hidden {
  display: none;
}

.relative {
  position: relative;
}

.handle {
  position: absolute;
  top: 28px;
  width: 16px;
  left: 0;
}

</style>
