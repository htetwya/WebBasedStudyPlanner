<?php
    include("db_con.php");
    $fname="Ma";
    $getquery="SELECT * FROM utusers WHERE firstName='Ma'";
    $getuser=mysqli_query($con,$getquery);
    if(mysqli_num_rows($getuser)>0){
        while($user=mysqli_fetch_assoc($getuser)){
            $passions=$user['passions'];
            $passions=unserialize($passions) ;
            foreach($passions as $passion){
                echo $passion."<br>";
            }
        }
    }else{  
        echo "nothing";
    }
?>