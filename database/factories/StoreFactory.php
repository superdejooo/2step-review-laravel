<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class StoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'name' => $this->faker->name(),
            'contact_email' => $this->faker->unique()->safeEmail(),
            'settings' => [
                "min_stars" => $this->faker->numberBetween(1, 5),
                "redirect_to" => $this->faker->url()
            ],
        ];
    }
}
