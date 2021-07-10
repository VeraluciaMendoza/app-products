// Product Constructor
class Product {
  constructor(name, price, year) {
    this.name = name;
    this.price = price;
    this.year = year;
  }
}

// UI Constructor
class UI {
    // Add a new Product
    addProduct(product) {
        const productList = document.getElementById('product-list');
        const element = document.createElement('div');
        element.innerHTML = `
            <div class="card text-center mb-4">
                <div class="card-body">
                    <strong>Product Name</strong>: ${product.name}
                    <strong>Product Price</strong>: ${product.price}
                    <strong>Product Year</strong>: ${product.year}
                    <button class="btn btn-danger" name="delete">Delete</button>
                </div>
            </div>
        `;
        productList.appendChild(element);               
    }

    // Reset Form
    resetForm() {
        document.getElementById('product-form').reset();
    }
    
    deleteProduct(element) {
        if(element.name === 'delete') {
            element.parentElement.parentElement.parentElement.remove();
            this.showMessage('Product Deleted Successfully', 'danger');
        }        
    }

    // Insert message
    showMessage(message, cssClass) {
        const div = document.createElement('div');
        div.className = `alert alert-${cssClass} mt-2`;
        div.appendChild(document.createTextNode(message));
        
        // Showing in DOM
        const container = document.querySelector('.container');
        const app = document.querySelector('#App');

        // Insert message in the UI
        container.insertBefore(div, app);

        // Remove the message after 2 seconds
        setTimeout(function() {
            document.querySelector('.alert').remove();
        }, 2000);
    }
}

// DOM Events

// Getting Form Values
document
    .getElementById('product-form')
    .addEventListener("submit", function (e) {
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const year = document.getElementById('year').value;

        // Create a new Product
        const product = new Product(name, price, year);
        
        // Create a new UI instance
        const ui = new UI();

        // Input validation
        if(name === '' || price === '' || year === '') {
            return ui.showMessage('Complete Fields Please', 'danger');
        }

        ui.addProduct(product);      
        ui.resetForm();
        ui.showMessage('Product Added Successfully', 'success')
        
        // Prevents the complete web reload
        e.preventDefault();
    });

document.getElementById('product-list').addEventListener("click", function (e) {
    const ui = new UI();
    ui.deleteProduct(e.target);
})