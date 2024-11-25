<?php

function addComment($name, $text)
{
  $filename = 'comments.json';

  $comments = getAllComments();

  $comments[] = [
    "name" => $name,
    "text" => $text
  ];

  file_put_contents($filename, json_encode($comments, JSON_PRETTY_PRINT));
}


function getAllComments()
{
  $filename = 'comments.json';
  if (file_exists($filename)) {
    return json_decode(file_get_contents($filename), true);
  }
  return [];
}

function dumpAllComments($comments)
{
  echo '<a href="./02FileJson.html">Retour au formulaire</a>';

  echo "<table border='1'>";
  echo "<tr><th>Name</th><th>Text</th></tr>";

  foreach ($comments as $comment) {
    echo "<tr>";
    echo "<td>" . htmlspecialchars($comment['name']) . "</td>";
    echo "<td>" . htmlspecialchars($comment['text']) . "</td>";
    echo "</tr>";
  }

  echo "</table>";
}
