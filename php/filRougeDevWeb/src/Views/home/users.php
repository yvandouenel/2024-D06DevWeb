<div>
    <h1>Utilisateurs</h1>
    <?php //var_dump($users); 
    ?>
    <section class="users-list">
        <?php if (!empty($users)): ?>
            <?php foreach ($users as $user): ?>
                <section class="d-flex gap-2">
                    <p><?= htmlspecialchars($user['id']) ?></p>
                    <p><?= htmlspecialchars($user['name']) ?></p>
                    <p><?= htmlspecialchars($user['email']) ?></p>
                </section>
            <?php endforeach; ?>
        <?php else: ?>
            <p>Aucun utilisateur trouvé</p>
        <?php endif; ?>
    </section>

</div>