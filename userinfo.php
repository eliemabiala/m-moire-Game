<!DOCTYPE html> 
<html> 
<head> 
    <title>Library Management System</title> 
    <meta charset="utf-8" name="viewport" content="width=device-width,intial-scale=1"> 
    <style type="text/css"> 
        #main_content{ 
            background: rgba(245, 245, 245, 0.9); 
            padding: 50px; 
        } 
        #side_bar{ 
            background: rgba(245, 245, 245, 0.9); 
            padding: 50px; 
        } 
        body{ 
            background: rgba(245, 245, 245, 0.4); 
            background-image: url("https://img.freepik.com/free-photo/abundant-collection-antique-books-wooden-shelves-generated-by-ai_188544-29660.jpg?size=626&ext=jpg&ga=GA1.1.1546980028.1704240000&semt=sph"); 
        } 
        .navbar{
            background-color: white;
        }
    </style> 
</head> 
<body> 
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark"> 
        <div class="container-fluid"> 
            <div class="navbar-header"> 
                <a class="navbar-brand" href="index.php">Library Management System</a> 
            </div> 
            <ul class="nav navbar-nav navbar-right"> 
                <li class="nav-item"> 
                <a class="nav-link" href="userinfo.php">User Login</a> 
                </li> 
            <li class="nav-item"> 
                <a class="nav-link" href="admin/indexad.php">Admin Login</a> 
            </li> 
            <li class="nav-item"> 
                <a class="nav-link" href="signup.php"></span>Signup</a> 
            </li> 
            </ul> 
        </div> 
    </nav> 
    <div class="row"> 
        <div class="col-md-8" id="main_content"> 
            <h3>User Login Form</h3>
            <form action="user.php" method="post"> 
                <div class="form-group"> 
                    <label for="email">Email:</label> 
                    <input type="email" name="email" class="form-control" required> 
                </div> 
                <div class="form-group"> 
                    <label for="password">Password:</label> 
                    <input type="password" name="password" class="form-control" required> 
                </div> 
                <button type="submit" name="login" class="btn btn-primary">Login</button> | 
                <a href="signup.php"> Signup now !!</a>     
            </form> 
            
        </div> 
    </div> 
</body> 
</html>