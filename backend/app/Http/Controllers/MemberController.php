<?php

namespace App\Http\Controllers;

use App\Http\Resources\MemberResource;
use App\Models\Member;
use App\Services\MemberService;
use Illuminate\Http\Request;

class MemberController extends Controller
{
    protected MemberService $memberService;

    public function __construct(MemberService $memberService)
    {
        $this->memberService = $memberService;
    }

    public function index(Request $request)
    {
        $members = $this->memberService->getAllMembers(
            $request->string('search')->trim()->toString()
        );

        return MemberResource::collection($members);
    }
}
