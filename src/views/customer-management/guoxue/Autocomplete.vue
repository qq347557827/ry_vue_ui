<template>
  <div>
    <h1>Draggable List with Handle and Expand Example</h1>
    <draggable v-model="items" handle=".drag-handle" @end="onEnd">
      <transition-group>
        <div v-for="(item, index) in items" :key="item.id" class="list-item">
          <span class="drag-handle">::</span>
          <div class="content">
            <div :class="{'text-content': true, 'expanded': item.expanded}">
              {{ item.name }}
            </div>
            <button @click="toggleExpand(index)" class="expand-button">
              {{ item.expanded ? '收起' : '展开' }}
            </button>
          </div>
        </div>
      </transition-group>
    </draggable>
  </div>
</template>

<script>
import draggable from 'vuedraggable';

export default {
  components: {
    draggable
  },
  data() {
    return {
      items: [
        { id: 1, name: 'Item 1 with a very long text that should overflow and be hidden initially', expanded: false },
        { id: 2, name: 'Item 2 with a very long text that should overflow and be hidden initially', expanded: false },
        { id: 3, name: 'Item 3 with a very long text that should overflow and be hidden initially', expanded: false },
        { id: 4, name: 'Item 4 with a very long text that should overflow and be hidden initially', expanded: false },
        { id: 5, name: 'Item 5 with a very long text that should overflow and be hidden initially', expanded: false }
      ]
    };
  },
  methods: {
    onEnd(event) {
      // 可选：当拖动结束时的回调
      console.log('Drag ended:', event);
    },
    toggleExpand(index) {
      this.items[index].expanded = !this.items[index].expanded;
    }
  }
};
</script>

<style>
.list-item {
  display: flex;
  align-items: center;
  padding: 10px;
  margin: 5px 0;
  background-color: #f1f1f1;
  border: 1px solid #ddd;
}

.drag-handle {
  cursor: move;
  margin-right: 10px;
}

.content {
  flex-grow: 1;
}

.text-content {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  height: 3em; /* Adjust height based on line height and number of lines */
}

.text-content.expanded {
  white-space: normal;
  -webkit-line-clamp: unset;
  height: auto;
}

.expand-button {
  background-color: transparent;
  border: none;
  color: blue;
  cursor: pointer;
  padding: 0;
}
</style>
