<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('invoices', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('presence_id'); // Référence à la table presences
            $table->string('mentor_name'); // Nom complet du mentor
            $table->string('accountant_name'); // Nom complet du comptable
            $table->decimal('amount', 10, 2); // Montant de la facture
            $table->date('date'); // Date de la facture
            $table->timestamps();

            // Clé étrangère
            $table->foreign('presence_id')->references('id')->on('presence')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('invoices');
    }
};
