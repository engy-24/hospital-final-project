 const form = document.querySelector("form");

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const username = document.getElementById("username").value.trim();
      const email = document.getElementById("exampleInputEmail1").value.trim();
      const password = document.getElementById("exampleInputPassword1").value;

    
      if (!username || !email || !password) {
        Swal.fire({
          icon: "error",
          title: "Missing Fields",
          text: "Please fill in all fields."
        });
        return;
      }

     
      if (!validatePassword(password)) {
        Swal.fire({
          icon: "error",
          title: "Invalid Password",
          text: "Password must be at least 7 characters long and contain letters and numbers."
        });
        return;
      }

      
      const existingEmail = localStorage.getItem("userEmail");
      if (existingEmail && existingEmail.toLowerCase() === email.toLowerCase()) {
        Swal.fire({
          icon: "warning",
          title: "Already Registered",
          text: "This email is already registered. Please login."
        });
        return;
      }

    
      localStorage.setItem("userName", username);
      localStorage.setItem("userEmail", email);
      localStorage.setItem("userPassword", password);

      // رسالة نجاح
      Swal.fire({
        icon: "success",
        title: "Account Created",
        text: "Your account has been created successfully!",
        confirmButtonText: "explore our website"
      }).then(() => {
        window.location.href = "index.html";
      });
    });

    function validatePassword(password) {
      return password.length > 6 && /[a-zA-Z]/.test(password) && /\d/.test(password);
    }