const app = new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  data() {
    return {
      isDark: true,
      show: true,
      newTodo: '',
      todos: [],
      day: this.todoDay(),
      date: new Date().getDate(),
      ord: this.nth(new Date().getDate()),
      year: new Date().getFullYear()
    };

  },
  methods: {
    addTodo() {
      const title = this.newTodo && this.newTodo.trim();
      if (!title) {
        return;
      }
      fetch('/api/todo', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title})
      })
          .then(res => res.json())
          .then(({todo}) => {
            this.todos.push(todo)
            this.newTodo = '';
          })
          .catch(e => console.log(e))
    },
    removeTodo(index) {
      this.todos.splice(index, 1);
    },
    todoDay() {
      var d = new Date();
      var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      return days[d.getDay()];
    },
    nth(d) {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1:return "st";
        case 2:return "nd";
        case 3:return "rd";
        default:return "th";}

    } },

  filters: {
    capitalize: function (value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
    date(value, withTime) {
      const options = {
        year: 'numeric',
        month: 'long',
        day: '2-digit'
      }

      if (withTime) {
        options.hour = '2-digit'
        options.minute = '2-digit'
        options.second = '2-digit'
      }
      return new Intl.DateTimeFormat('ru-RU', options).format(new Date(value))
    }
  } });

Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('MM/DD/YYYY hh:mm')
  }
});