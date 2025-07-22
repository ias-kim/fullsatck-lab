<script>
export default {
  data() {
    return {
      todos: JSON.parse(localStorage.getItem('todo-list-vue') || '[]'),

      editingTodo: null,
      editingTitle: '',
      visibilityFilter: 'ALL',
    };
  },

  watch: {
    todos: {
      handler(prev, curr) {
        localStorage.setItem('todo-list-vue', JSON.stringify(curr));
      },
      deep: true,
    },
  },

  computed: {
    num_remaining_todos() {
      return this.todos.filter((todo) => !todo.completed).length;
    },

    filteredTodos() {
      switch (this.visibilityFilter) {
        case 'ALL':
          return this.todos;
        case 'ACTIVE':
          return this.todos.filter((todo) => !todo.completed);
        case 'COMPLETED':
          return this.todos.filter((todo) => todo.completed);
      }
    },
  },

  directives: {
    hasFocus: {
      mounted(element, value) {
        if (value) element.focus();
      },
    },
  },

  methods: {
    할일추가(event) {
      if (event.isComposing) return true;

      const title = event.target.value;
      this.todos.push({ title, completed: false });

      event.target.value = '';
    },

    할일완료토클(index) {
      this.todos[index].completed = !this.todos[index].completed;
    },

    할일삭제(index) {
      this.todos.splice(index, 1);
    },

    할일수정(todo) {
      this.editingTodo = todo;
      this.editingTitle = todo.title;
    },

    할일제목수정(index, event) {
      if (event.isComposing) return true;

      this.todos[index].title = this.editingTitle;
      this.editingTodo = null;
      this.editingTitle = '';
    },
    할일제목수정취소() {
      this.editingTitle = null;
      this.editingTitle = '';
    },
    전체보기() {
      this.visibilityFilter = 'ALL';
    },
    해야할일보기() {
      this.visibilityFilter = 'ACTIVE';
    },
    완료한일보기() {
      this.visibilityFilter = 'COMPLETED';
    },
    전체완료토글() {
      const isAllCompleted = this.todos.every((todo) => todo.completed);
      this.todos = this.todos.map((todo) => ({
        ...todo,
        completed: !isAllCompleted,
      }));
    },
    완료된할일삭제() {
      this.todos = this.todos.filter((todo) => !todo.completed);
    },
  },
};
</script>

<template>
  <input @keydown.enter="할일추가($event)" type="text" />
  <ol>
    <li
      v-for="(todo, index) in filteredTodos"
      class="todos"
      :class="{ completed: todo.completed, editing: todo === editingTodo }"
    >
      <template v-if="todo !== editingTodo">
        <input
          type="checkbox"
          :checked="todo.completed"
          @click="할일완료토클(index)"
        />
        <span @dblclick="할일수정(todo)">{{ todo.title }}</span>
        <button @click="할일삭제(index)">X</button>
      </template>
      <template v-else>
        <input
          type="text"
          v-model="editingTitle"
          @keydown.enter="할일제목수정(index, $event)"
          @blur="할일제목수정취소()"
          v-has-focus="todo === editingTodo"
        />
      </template>
    </li>
  </ol>

  <div>남은 할 일 {{ num_remaining_todos }}</div>
  <hr />

  <div>
    {{ visibilityFilter }}
    <button @click="전체보기()">전체보기</button>
    <button @click="해야할일보기()">해야할일보기</button>
    <button @click="완료한일보기()">완료한일보기</button>
  </div>

  <hr />
  <div>
    <button @click="전체완료토글()">전체완료</button>
    <button @click="완료된할일삭제()">완료 삭제</button>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;

  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
