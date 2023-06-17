<!DOCTYPE html>
<html>
<head>
  <title>Workshop Website</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
  <header>
    <h1>Workshop Website</h1>
    <nav>
      <ul>
        <li><a href="index.html">Home</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="about.html">About</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <h2>Welcome to Our Workshop</h2>
    <p>At our workshop, we offer a wide range of services to keep your vehicle running smoothly.</p>
    <p>Choose from services such as paint, engine oil, tyre services, air conditioning, and more.</p>
    
    <!-- Calculator Form -->
    <form action="calculate.php" method="post">
      <h3>Service Calculator</h3>
      <label for="paint">Paint:</label>
      <input type="checkbox" name="paint" id="paint">
      
      <label for="engine-oil">Engine Oil:</label>
      <input type="checkbox" name="engine-oil" id="engine-oil">
      
      <!-- Add more service checkboxes here -->
      
      <input type="submit" value="Calculate">
    </form>
  </main>
  
  <footer>
    <p>&copy; 2023 Workshop Website. All rights reserved.</p>
  </footer>
</body>
</html>