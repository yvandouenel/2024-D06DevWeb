<?php

class TransactionProcessor
{
  /**
   * Version sans yield - charge tout le fichier en mémoire
   */
  public function loadTransactionsWithoutYield(string $filename): array
  {
    $transactions = [];
    $handle = fopen($filename, 'r');

    // Saute l'en-tête
    fgetcsv($handle);
    while (($data = fgetcsv($handle)) !== false) {
      $transactions[] = [
        'date' => $data[0],
        'amount' => floatval($data[1]),
        'description' => $data[2]
      ];
    }
    fclose($handle);
    return $transactions;
  }

  /**
   * Version avec yield - traite le fichier ligne par ligne
   */

  public function loadTransactionsWithYield(string $filename): \Generator
  {
    $handle = fopen($filename, 'r');

    // Saute l'en-tête
    fgetcsv($handle);
    while (($data = fgetcsv($handle)) !== false) {
      //echo "data[0] : " . $data[0] . PHP_EOL;
      yield [
        'date' => $data[0],
        'amount' => floatval($data[1]),
        'description' => $data[2]
      ];
    }
    fclose($handle);
  }
}

// Script de démonstration
class TransactionDemo
{
  private TransactionProcessor $processor;

  public function __construct()
  {
    $this->processor = new TransactionProcessor();
  }

  public function compareMemoryUsage(): void
  {
    // Création d'un gros fichier CSV de test
    $this->createLargeCSVFile('transactions.csv', 100000); // Beaucoup de lignes !
    // Test sans yield
    $startMemory = memory_get_usage();
    $startTime = microtime(true);

    $transactions = $this->processor->loadTransactionsWithoutYield('transactions.csv');
    $sum = 0;
    foreach ($transactions as $transaction) {
      $sum += $transaction['amount'];
    }

    $memoryWithoutYield = memory_get_usage() - $startMemory;
    $timeWithoutYield = microtime(true) - $startTime;

    // Test avec yield
    $startMemory = memory_get_usage();
    $startTime = microtime(true);

    $sum = 0;
    foreach ($this->processor->loadTransactionsWithYield('transactions.csv') as $transaction) {
      $sum += $transaction['amount'];
    }

    $memoryWithYield = memory_get_usage() - $startMemory;
    $timeWithYield = microtime(true) - $startTime;

    // Affichage des résultats
    echo "Sans yield:\n";
    echo "Mémoire utilisée: " . number_format($memoryWithoutYield / 1024 / 1024, 2) . " MB\n";
    echo "Temps d'exécution: " . number_format($timeWithoutYield, 2) . " secondes\n\n";

    echo "Avec yield:\n";
    echo "Mémoire utilisée: " . number_format($memoryWithYield / 1024 / 1024, 2) . " MB\n";
    echo "Temps d'exécution: " . number_format($timeWithYield, 2) . " secondes\n";
  }

  private function createLargeCSVFile(string $filename, int $rows): void
  {
    $handle = fopen($filename, 'w');

    // En-tête
    fputcsv($handle, ['Date', 'Amount', 'Description']);
    // Données
    for ($i = 0; $i < $rows; $i++) {
      fputcsv($handle, [
        date('Y-m-d', strtotime("-$i days")),
        rand(100, 10000) / 100,
        "Transaction #$i"
      ]);
    }
    fclose($handle);
  }
}

// Utilisation
$demo = new TransactionDemo();
$demo->compareMemoryUsage();
