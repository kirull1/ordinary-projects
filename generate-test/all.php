<?php 
    include 'assets/doctype.html'; 
    require_once 'models/get.php';
    $array[0] = get::all('biology');
    $array[1] = get::all('geography');
?>
    <h2 style="text-align: center; margin-top: 60px;">Все определения</h2>
    <section class="all">
        <div style="display: flex;justify-content: center; font-size: 18px;">
            <a href="#biologia">Биология</a>
            <div style="width: 40px;"></div>
            <a href="#geografia">География</a>
        </div>
        <hr>
        <br>
        <p id="biologia" style="font-size: 20px;"><strong>Биология (кол-во <?php echo count($array[0]) ?>)</strong></p>
        <br>
        <ul style="font-size: 18px;">
            <?php
                foreach ($array[0] as $value) {
                    echo "<li>{$value['word']} - {$value['questions']}</li>";
                }
            ?>
        </ul>
        <hr>
        <br>
        <p id="geografia" style="font-size: 20px;"><strong>География (кол-во <?php echo count($array[1]) ?>)</strong></p>
        <br>
        <ul style="font-size: 18px;">
            <?php
                foreach ($array[1] as $value) {
                    echo "<li>{$value['word']} - {$value['questions']}</li>";
                }
            ?>
        </ul>
    </section>
</body>
</html>