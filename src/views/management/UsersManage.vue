<template>
  <v-card flat>
    <v-tabs v-model="currentWindow" fixed-tabs>
    <v-tab
      v-for="window in windows"
      :key="window.value"
      :value="window.value"
      @click="onTab(window)"
    >
      {{ window.title }} {{ window.count }}
    </v-tab>
  </v-tabs>
  <v-card v-if="$store.getters.isSearch" class="ma-2 pa-2">
    <v-card-text>
      <v-row justify="center">
        <v-text-field
          v-model="sVal"
          color="blue"
          label="Search"
          variant="underlined"
          :clearable="true"
          @update:model-value="onSChange"
        ></v-text-field>
        <v-btn @click="onSearch" color="blue" class="ma-3">Search</v-btn>
      </v-row>
    </v-card-text>
  </v-card>
  <v-window v-model="currentWindow">
    <v-window-item
      v-for="window in windows"
      :key="window.value"
      :value="window.value"
    >
      <v-card flat>
        <v-virtual-scroll
          :ref="window.scrollRef"
          :items="sVal ? window.fUsers : window.users"
          height="700"
          item-height="70"
        >
          <template v-slot:default="{ item }">
            
          <UserComp
              :user="item"
              @on-stop="updateUser"
              @onDelete="deleteUser"
            >
            
              <v-menu>
            <template v-slot:activator="{ props }">
              <v-btn icon="mdi-dots-vertical" v-bind="props"></v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(item, i) in items"
                :key="i"
              >
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
      
            </UserComp>
            
          </template>
        </v-virtual-scroll>
      </v-card>
      <LoadingAndErrorSc
        :isLoading="window.loading"
        :msg="window.msg"
        :error="window.error"
      />
    </v-window-item>
  </v-window>
  </v-card>
</template>

<script>
import adminController from "@/controllers/adminController.js";
import LoadingAndErrorSc from "@/components/LoadingAndErrorSc.vue";
import WritterComp from "@/components/WritterComp.vue";
import UserComp from "@/components/UserComp.vue";

export default {
  components: { LoadingAndErrorSc, WritterComp, UserComp },
  data() {
    return {
      currentWindow: "newWrittersRequests",
      currentIndex: 0,
      sVal: null,
      windows: [
        {
          index: 0,
          title: "Users",
          value: "users",
          isStoped: false,
          count: 0,
          page: 0,
          users: [],
          fUsers: [],
          loading: true,
          isLoaded: false,
          error: false,
          msg: null,
          scrollRef: null,
        },
        {
          index: 1,
          title: "Stoped Users",
          value: "stopedUsers",
          isStoped: true,
          count: 0,
          page: 0,
          users: [],
          fUsers: [],
          loading: true,
          isLoaded: false,
          error: false,
          msg: null,
          scrollRef: null,
        },
      ],
    };
  },
  async mounted() {
    await this.onTab(this.windows[0]);
  },
  methods: {
    onTab: async function (window) {
      this.currentWindow = window.value;
      this.currentIndex = window.index;
      if (!window.users.length) {
        await this.loadUsers(window);
      }
    },
    contains: function (prop, val) {
      if (prop) {
        return prop.includes(val);
      }
      return false;
    },
    onSChange: function () {
      if (this.sVal) {
        this.windows[this.currentIndex].msg = null;
        this.windows[this.currentIndex].fUsers = this.windows[
          this.currentIndex
        ].users.filter((user) => {
          if (this.sVal.includes("@")) {
            return this.contains(user.email, this.sVal);
          }
          return (
            this.contains(user.name, this.sVal) ||
            this.contains(user.phone, this.sVal)
          );
        });
      }
    },
    onSearch: async function () {
      if (this.sVal) {
        const window = this.windows[this.currentIndex];
        window.loading = true;
        window.error = false;
        window.msg = null;
        window.page = 0;
        const res = await adminController.usersSearch(
          this.sVal,
          window.page,
          window.isStoped
        );
        window.loading = false;
        console.log(res);
        if (res.state) {
          if (res.count) {
            window.fUsers = res.users;
            window.count = res.count;
            window.isLoaded = true;
          } else {
            window.msg = "There Is No Users";
          }
        } else {
          window.msg = res.message;
          window.error = true;
        }
      }
    },
    updateUser: function (user) {
      this.deleteUser(user.Id);
      if (user.isStoped) {
        if (this.windows[1].isLoaded) {
          this.windows[1].users.push(user);
          this.windows[1].count++;
        }
      } else {
        if (this.windows[0].isLoaded) {
          this.windows[0].users.push(user);
          this.windows[0].count++;
        }
      }
    },
    deleteUser: function (id) {
      const users = this.windows[this.currentIndex].users.filter(
        (el) => el.Id !== id
      );
      this.windows[this.currentIndex].users = users;
      this.windows[this.currentIndex].count--;
    },
    loadUsers: async function (window) {
      window.loading = true;
      window.error = false;
      window.msg = null;
      const res = await adminController.getUsers(window.page, window.isStoped);
      window.loading = false;
      if (res.state) {
        if (res.count) {
          window.users.push(...res.users);
          window.count = res.count;
          window.page++;
          window.isLoaded = true;
        } else {
          window.msg = "There Is No Users";
        }
      } else {
        window.msg = res.message;
        window.error = true;
      }
    },
  },
};
</script>
