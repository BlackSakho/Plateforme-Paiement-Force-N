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
        Schema::create('presence', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('mentor_id'); // Clé étrangère pour le mentor
            $table->date('date');
            $table->time('time');
            $table->string('cours');
            $table->text('notes')->nullable();
            $table->boolean('faith_declaration');
            $table->string('status')->default('pending');
            $table->boolean('validated_by_consultant')->default(false);
            $table->boolean('validated_by_certificate_manager')->default(false);
            $table->boolean('validated_by_finance')->default(false);
            $table->timestamps();

            $table->foreign('mentor_id')->references('id')->on('users')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('presence');
    }
};
