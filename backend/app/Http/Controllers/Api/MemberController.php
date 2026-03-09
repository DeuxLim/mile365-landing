<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\MemberResource;
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
