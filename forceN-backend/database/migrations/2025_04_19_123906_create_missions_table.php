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
        Schema::create('missions', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // Titre de la mission
            $table->text('description'); // Description de la mission
            $table->date('date'); // Date de la mission
            $table->time('time'); // Heure de la mission
            $table->unsignedBigInteger('mentor_id'); // ID du mentor assigné
            $table->enum('status', ['pending', 'active', 'completed'])->default('pending'); // Statut de la mission
            $table->timestamps();

            // Clé étrangère pour le mentor
            $table->foreign('mentor_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('missions');
    }
};
