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
        Schema::table('presence', function (Blueprint $table) {
            $table->string('status')->default('pending'); // Statut global
            $table->boolean('validated_by_consultant')->default(false); // Validation par le consultant
            $table->boolean('validated_by_certificate_manager')->default(false); // Validation par le responsable certificat
            $table->boolean('validated_by_finance')->default(false); // Validation par le service finance
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('presence', function (Blueprint $table) {
            $table->dropColumn('status');
            $table->dropColumn('validated_by_consultant');
            $table->dropColumn('validated_by_certificate_manager');
            $table->dropColumn('validated_by_finance');
        });
    }
};