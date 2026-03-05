<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        /**
         * Create Roles
         */
        $superAdmin = Role::updateOrCreate(['name' => 'super_admin']);
        $clubAdmin = Role::updateOrCreate(['name' => 'club_admin']);
        $member = Role::updateOrCreate(['name' => 'member']);

        /**
         * Create Permissions - to be used by the roles above
         */
        // Admin access (base)
        $adminAccess = Permission::updateOrCreate(['name' => 'admin_access']);

        // Members
        $membersView = Permission::updateOrCreate(['name' => 'members_view']);
        $membersManage = Permission::updateOrCreate(['name' => 'members_manage']);

        // Membership requests
        $membershipRequestsView = Permission::updateOrCreate(['name' => 'membership_requests_view']);
        $membershipRequestsReview = Permission::updateOrCreate(['name' => 'membership_requests_review']);

        // Admin management
        $adminsManage = Permission::updateOrCreate(['name' => 'admins_manage']);


        /**
         * Attach permissions to roles
         * Creates entries on permissions_roles pivot table
         */
        // super_admin gets everything
        $superAdmin->permissions()->syncWithoutDetaching([
            $adminAccess->id,
            $membersView->id,
            $membersManage->id,
            $membershipRequestsView->id,
            $membershipRequestsReview->id,
            $adminsManage->id,
        ]);

        // club_admin permissions
        $clubAdmin->permissions()->syncWithoutDetaching([
            $adminAccess->id,
            $membersView->id,
            $membersManage->id,
            $membershipRequestsView->id,
            $membershipRequestsReview->id,
        ]);

        // member has no default permissions for now
        // leave empty intentionally
    }
}
