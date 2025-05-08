<template>
  <div
    class="navbar-container d-flex content align-items-center"
    style="background: linear-gradient(141deg, rgba(64, 186, 178,1) 0%, rgba(64, 186, 178,1) 36%, rgba(31, 125, 83,0.58) 58%, rgba(31, 125, 83,1) 100%);"
  >

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link
          class="nav-link"
          @click="toggleVerticalMenuActive"
        >
          <feather-icon
            icon="MenuIcon"
            size="21"
          />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <div class="bookmark-wrapper align-items-center flex-grow-1 d-none d-lg-flex">
      <div class="logo-container">
        <b-img
          style="height: 50px;"
          src="@/assets/images/logo/logosem-navbar.png"
        />
      </div>
      <!-- <dark-toggler class="d-none d-lg-block" /> -->
      <!-- <div>
        <b-link
          to="/"
        >
          <b-navbar-nav class="nav">
            <b-button
              pill
              variant="flat-primary"
              style="padding-bottom: 8px;"
            >
              <feather-icon
                style="height: 35px; color: #003885;"
                icon="HomeIcon"
                size="23"
              />
              <label
                style="padding: 5px; font-size: 15px; color: #000;"
              >
                หน้าหลัก
              </label>
            </b-button>
          </b-navbar-nav>
        </b-link>
      </div> -->

      <!-- <div>
        <b-link
          to="location"
        >
          <b-navbar-nav class="nav">
            <b-button
              pill
              variant="flat-primary"
              style="padding-bottom: 8px;"
            >
              <feather-icon
                style="height: 35px; color: #003885;"
                icon="GlobeIcon"
                size="23"
              />
              <label
                style="padding: 5px; font-size: 15px; color: #000;"
              >
                สถานที่ติดตั้ง
              </label>
            </b-button>
          </b-navbar-nav>
        </b-link>
      </div> -->

      <!-- <div>
        <b-link
          to="cctv"
        >
          <b-navbar-nav class="nav">
            <b-button
              pill
              variant="flat-primary"
              style="padding-bottom: 8px;"
            >
              <feather-icon
                style="height: 35px; color: #003885;"
                icon="CameraIcon"
                size="23"
              />
              <label
                style="padding: 5px; font-size: 15px; color: #000;"
              >
                กล้องวงจรปิด
              </label>
            </b-button>
          </b-navbar-nav>
        </b-link>
      </div> -->

      <!-- <div>
        <b-link
          to="resultPCU"
        >
          <b-navbar-nav class="nav">
            <b-button
              pill
              variant="flat-primary"
              style="padding-bottom: 8px;"
            >
              <feather-icon
                style="height: 35px; color: #003885;"
                icon="BookOpenIcon"
                size="23"
              />
              <label
                style="padding: 5px; font-size: 15px; color: #000;"
              >
                สรุปข้อมูลเปรียบเทียบ
              </label>
            </b-button>
          </b-navbar-nav>
        </b-link>
      </div> -->

      <!-- <div>
        <b-link
          to="log"
        >
          <b-navbar-nav class="nav">
            <b-button
              pill
              variant="flat-primary"
              style="padding-bottom: 8px;"
            >
              <feather-icon
                style="height: 35px; color: #003885;"
                icon="RefreshCcwIcon"
                size="23"
              />
              <label
                style="padding: 5px; font-size: 15px; color: #000;"
              >
                ประวัติย้ายจุดติดตั้ง
              </label>
            </b-button>
          </b-navbar-nav>
        </b-link>
      </div> -->

      <!-- <div>
        <b-link
          to="transactionlog"
        >
          <b-navbar-nav class="nav">
            <b-button
              pill
              variant="flat-primary"
              style="padding-bottom: 8px;"
            >
              <feather-icon
                style="height: 35px; color: #003885;"
                icon="FileIcon"
                size="23"
              />
              <label
                style="padding: 5px; font-size: 15px; color: #000;"
              >
                Log
              </label>
            </b-button>
          </b-navbar-nav>
        </b-link>
      </div> -->

      <div>

        <b-navbar-nav class="nav">
          <b-button
            pill
            variant="flat-primary"
            style="padding-bottom: 8px;"
          >
            <feather-icon
              style="height: 35px; color: #003885;"
              icon="FileIcon"
              size="23"
            />
            <label
              style="padding: 5px; font-size: 15px; color: #000;"
            >
              Diagram
            </label>
          </b-button>
        </b-navbar-nav>
      </div>
    </div>

    <b-navbar-nav
      v-if="mobile != 1"
      class="nav align-items-center ml-auto"
    >
      <b-nav-item-dropdown
        right
        toggle-class="d-flex align-items-center dropdown-user-link"
        class="dropdown-user"
      >
        <template #button-content>
          <div class="d-sm-flex d-none user-nav">
            <p class="user-name font-weight-bolder mb-0">
              {{ userData.firstname }} {{ userData.lastname }}
            </p>
            <span class="user-status">{{ userData.role }}</span>
          </div>
          <b-avatar
            v-if="mobile != 1"
            size="40"
            variant="light-primary"
            badge
            class="badge-minimal"
            badge-variant="success"
          />
        </template>
        <b-dropdown-item
          v-if="userData.role === 'Admin'"
          link-class="d-flex align-items-center"
          to="user"
          class="hidden"
        >
          <feather-icon
            size="16"
            icon="UserIcon"
            class="mr-50"
          />
          <span>Manage User</span>
        </b-dropdown-item>
        <b-dropdown-item
          link-class="d-flex align-items-center"
          @click="logout()"
        >
          <feather-icon
            size="16"
            icon="LogOutIcon"
            class="mr-50"
          />
          <span>Logout</span>
        </b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BNavItemDropdown, BDropdownItem, BAvatar, BButton, BImg,
} from 'bootstrap-vue'
// import DarkToggler from '@/@core/layouts/components/app-navbar/components/DarkToggler.vue'

export default {
  components: {
    BButton,
    BLink,
    BNavbarNav,
    BNavItemDropdown,
    BDropdownItem,
    BAvatar,
    BImg,
    // DarkToggler,

    // Navbar Components
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      mobile: '',
    }
  },
  mounted() {
  },
  methods: {
    logout() {
      this.$store
        .dispatch('auth/logout')
        .then(() => this.$router.push('/login'))
        .catch(err => console.log(err))
    },
  },
}
</script>
<style lang="scss" scoped>
.navbar-container {
  padding: 0 1rem;

  .bookmark-wrapper {
    display: flex;
    align-items: center;
    margin-left: 0;
    padding-left: 0;

    .logo-container {
      margin-right: 1.5rem;
      min-width: 40px; // Ensures logo maintains minimum width

      a {
        display: block;
        line-height: 0; // Removes extra space below image
      }
    }

    .nav-buttons-container {
      display: flex;
      align-items: center;
      gap: 0.5rem; // Adds consistent spacing between buttons

      .nav {
        margin: 0;
      }
    }
  }
}

// Ensures buttons maintain consistent spacing
.b-navbar-nav {
  .nav {
    margin: 0 0.25rem;
  }
}
</style>
