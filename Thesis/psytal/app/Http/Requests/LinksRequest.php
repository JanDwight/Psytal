<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LinksRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            // 'linkId' => 'required|integer',
            'class_code' => 'required|string',
            'class_description' => 'required|string',
            'instructor_name' => 'required|string',
            'url'=>'required|string',
            'archived' => 'integer'
            

        ];
    }
}
