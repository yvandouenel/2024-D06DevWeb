<div class="container" id="dynamical-user">
  <h1>Page dynamique (js) pour afficher et plus tard gérer les utilisateurs</h1>
  <?php //var_dump($users); 
  ?>
  <section class="users-list altern-grey">
    <?php if (!empty($users)): ?>
      <?php foreach ($users as $user): ?>
        <section class="d-flex gap-2 border-1" data-userid="<?= htmlspecialchars($user['id']) ?>">
          <p><?= htmlspecialchars($user['id']) ?></p>
          <p><?= htmlspecialchars($user['name']) ?></p>
          <p><?= htmlspecialchars($user['email']) ?></p>
          <button class="btn btn-danger">Supprimer</button>
        </section>
      <?php endforeach; ?>
    <?php else: ?>
      <p>Aucun utilisateur trouvé</p>
    <?php endif; ?>
  </section>

</div>