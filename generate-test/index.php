<?php 
    include 'assets/doctype.html'; 
?>
    <section class="main">
        <h1>Генератор тестов</h1>
        <form action="create.php" method="POST">
            <div class="section_div">
                <label><input type="radio" name="things" value="biology" class="radio"><div class="button">Биология</div></label>
                <label><input type="radio" name="things" value="geography" class="radio"><div class="button">География</div></label>
            </div>
            <div class="sect_pol">
                <input type="range" name="range" min="1" max="50" value="25" id="range" class="polsunok">
                <div class="num">25</div>
            </div>
            <div style="margin: 60px auto 20px;width: max-content;">
                <input type="submit" value="Создать" class="submit">
            </div>
            <a style="text-align: center;display: block;" href="all.php">Все вопросы</a>
        </form>
    </section>

<script src="https://code.jquery.com/jquery-3.6.0.js"></script>
<script>
    $(document).on('input change', 'input[type="range"]', function() {
        $('.num').html($(this).val());
    });
</script>
</body>
</html>