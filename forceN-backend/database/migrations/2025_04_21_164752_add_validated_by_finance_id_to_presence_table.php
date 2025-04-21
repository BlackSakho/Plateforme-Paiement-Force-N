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
            $table->unsignedBigInteger('validated_by_finance_id')->nullable()->after('validated_by_finance');
            $table->foreign('validated_by_finance_id')->references('id')->on('users')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('presence', function (Blueprint $table) {
            $table->dropForeign(['validated_by_finance_id']);
            $table->dropColumn('validated_by_finance_id');
        });
    }
};