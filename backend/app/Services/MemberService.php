<?php

namespace App\Services;

use App\Models\Member;

class MemberService
{
    public function getAllMembers(?string $search = null)
    {
        $query = Member::query()
            ->latest()
            ->when(
                filled($search),
                function ($q) use ($search) {
                    $term = '%' . str_replace('%', '\\%', trim($search)) . '%';

                    $q->where(function ($sub) use ($term) {
                        $sub->where('first_name', 'like', $term)
                            ->orWhere('last_name', 'like', $term)
                            ->orWhere('email', 'like', $term)
                            ->orWhere('city', 'like', $term)
                            ->orWhere('province', 'like', $term);
                    });
                }
            );

        return $query->paginate(10);
    }
}
