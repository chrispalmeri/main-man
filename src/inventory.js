// src/inventory.js

import ui from './ui.js';

export default new function() {
  this.all = function() {
    fetch('/items')
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      let list = document.getElementById('items');
      let html = '';
      if(json.length > 0) {
        html = `<table><thead><tr>
          <th width="50%">Item</th><th>Quantity</th><th>Order</th><th>Edit</th><th>Delete</th>
          </tr></thead><tbody>`;
        json.forEach((item, index) => {
          html += `<tr>
            <td>${item.item_name}</td>
            <td><input value="${item.item_quantity}" /></td>
            <td><button data-action="order" data-id="${item.item_id}">Order</button></td>
            <td><button data-action="edit" data-id="${item.item_id}">Edit</button></td>
            <td><button data-action="delete" data-id="${item.item_id}">Delete</button></td>
          </tr>`;
        });
        html += `</tbody></table>`;
      } else {
        html = '<p>There are no items to show</p>';
      }
      list.innerHTML = html;
    });
  }

  this.get = function(id) {
    fetch('/items/' + id)
    .then((res) => {
      return res.json();
    })
    .then((json) => {
      json.forEach((item) => {
        ui.write(item);
      })
    });
  }

  this.set = function(data) {
    let url = '/items';

    if(data.item_id) {
      url = '/items/' + data.item_id;
      delete data.item_id;
    }

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });
  }

  this.delete = function(id) {
    fetch('/items/' + id, {
      method: "DELETE"
    });
  }
}